"""for i in range(1000,10000):
    s=str(i)
    summs=[]
    summs.append(int(s[0])+int(s[1]))
    s2=int(s[1])+int(s[2])
    s3=int(s[2])+int(s[3])
    summs.append(s2)
    summs.append(s3)
    n=0
    minn=min(summs)
    for x in range(len(summs)):
        if summs[x]==minn:
            n=x
    del summs[n]
    
    print(summs,i)

    input()
for i in range(10000):
    x = i
    S = 1
    A = 5
    while x // 7 > 0:
        if x % 2 == 0:
            S = S + A
        else:
            S = S * (x % 7)
    x = x // 7
    if S>100:
        print(i)

def F(a,b):
    if a>b:
        return 0
    elif a==b:
        return 1
    else:
        return F(a+1,b)+F(a*4,b)
print(F(1,55))









day=input()
month=input()
year=input()
print(f'{day}.{month}.{year[-2]}{year[-1]}')
"""
with open('24-s1 (1).txt','r')as s:
    data=s.readlines()


mina=10000
index=10**20
for i in range(len(data)):
    x=data[i]
    a=x.count('A')
    if a<mina:
        index=i
        mina=a

mainstr=data[index]
dels={

}

for x in mainstr:
    if x in dels:
        dels[x]+=1
    else:
        dels[x]=1

maxsym=0
for x in dels:
    if dels[x]>maxsym:
        maxsym=dels[x]
        flag=x
print(flag)
counterg=0
for x in data:
    counterg+=x.count('Z')
print(counterg)